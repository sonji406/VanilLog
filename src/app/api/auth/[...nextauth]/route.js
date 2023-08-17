import dbConnect from '@lib/dbConnect';
import User from '@models/User';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, profile, trigger }) {
      // token 제외 나머지 데이터는 처음 로그인할때만 들어옴
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.id;
      }

      /*
      isNewUser deprecated되고 대신 회원가입(signUp)이벤트인지 트리거와 비교하려고 했으나,
      trigger === signUp 인 조건을 찾지 못해 signIn 인 경우 디비에 유저가 없으면 넣게 변경
      */
      if (trigger === 'signIn') {
        await dbConnect();
        const isUserExist = await User.exists({ nickname: token.name });

        if (!isUserExist) {
          const newUser = new User({
            nickname: token.name,
            socialLoginType: account ? account.provider : undefined,
            profileImage: token.picture,
            blogPosts: [],
            comments: [],
          });
          try {
            await newUser.save();
          } catch (error) {
            throw error;
          }
        }
      }

      return token;
    },
    async session({ session, user, token }) {
      // jwt 사용시 토큰을 대신 리턴
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

// export default NextAuth(authOptions);
export { handler as GET, handler as POST };
