import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    nickname: { type: String, required: true },
    socialLoginType: { type: String, enum: ['facebook', 'google', 'twitter'] },
    profileImage: { type: String }, // URL or path to profile image
    blogPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
