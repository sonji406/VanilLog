import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: [
      {
        type: { type: String, required: true },
        value: { type: mongoose.Schema.Types.Mixed, required: true },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
