import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: [
      {
        type: { type: String, enum: ['text', 'image', 'url'], required: true },
        value: { type: String, required: true },
      },
    ],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true },
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
