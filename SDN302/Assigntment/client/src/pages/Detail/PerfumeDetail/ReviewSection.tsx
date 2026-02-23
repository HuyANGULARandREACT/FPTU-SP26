import React, { useState, useEffect } from "react";
import type { IPerfume, IComment } from "../../../types/type";
import { commentAPI } from "../../../services/commentAPI";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "../../../components/ui/button";

interface ReviewSectionProps {
  perfume: IPerfume;
}

const ReviewSection = ({ perfume }: ReviewSectionProps) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<IComment[]>([]);
  const [rating, setRating] = useState<number>(3);
  const [content, setContent] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasCommented, setHasCommented] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      if (!perfume._id) return;
      try {
        const data = await commentAPI.getCommentsByPerfume(perfume._id);
        setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };
    fetchComments();
  }, [perfume._id]);

  // Check if user has already commented
  useEffect(() => {
    const checkFeedback = async () => {
      if (!user || !perfume._id) return;
      try {
        const hasCommented = await commentAPI.checkMemberFeedback(perfume._id);
        setHasCommented(hasCommented);
      } catch (err) {
        console.error("Failed to check feedback:", err);
      }
    };
    checkFeedback();
  }, [user, perfume._id]);

  // Calculate average rating
  const averageRating =
    comments.length > 0
      ? comments.reduce((sum, c) => sum + c.rating, 0) / comments.length
      : 0;

  // Calculate star distribution
  const starDistribution = [1, 2, 3].map((star) => ({
    stars: star,
    count: comments.filter((c) => c.rating === star).length,
    percentage:
      comments.length > 0
        ? (comments.filter((c) => c.rating === star).length / comments.length) *
          100
        : 0,
  }));

  // Get initials from name
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Handle submit feedback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("You must be logged in to provide feedback");
      return;
    }

    if (!content.trim()) {
      setError("Please provide your reflection");
      return;
    }

    if (!perfume._id) {
      setError("Invalid perfume");
      return;
    }

    setLoading(true);
    try {
      const newComment = await commentAPI.createComment({
        perfumeId: perfume._id,
        memberId: user._id,
        rating,
        content: content.trim(),
      });

      setComments([newComment, ...comments]);
      setSuccess("Feedback archived successfully!");
      setContent("");
      setRating(3);
      setHasCommented(true);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 py-12 border-t border-slate-200 dark:border-slate-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side - Reviews List */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-black mb-2">ARTISAN FEEDBACK</h2>
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Experiences shared by our distinguished members
            </p>
          </div>

          {/* Average Rating & Distribution */}
          <div className="mb-10 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <div className="flex items-start gap-8">
              {/* Average Rating */}
              <div className="text-center">
                <div className="text-5xl font-black text-primary mb-1">
                  {averageRating.toFixed(1)}
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-500">
                  Average Rating
                </div>
              </div>

              {/* Star Distribution */}
              <div className="flex-1">
                {[3, 2, 1].map((star) => {
                  const dist = starDistribution.find((d) => d.stars === star);
                  return (
                    <div key={star} className="flex items-center gap-3 mb-2">
                      <div className="flex gap-0.5 text-xs text-primary">
                        {[...Array(3)].map((_, i) => (
                          <span key={i}>{i < star ? "★" : "☆"}</span>
                        ))}
                      </div>
                      <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${dist?.percentage || 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 w-8">
                        {dist?.count || 0}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-center text-slate-500 py-8">
                No feedback yet. Be the first to share your experience!
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="p-6 bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                      {getInitials(comment.author?.memberFirstName && comment.author?.memberLastName 
                        ? `${comment.author.memberFirstName} ${comment.author.memberLastName}`
                        : "Anonymous")}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold uppercase text-sm">
                            {comment.author?.memberFirstName && comment.author?.memberLastName
                              ? `${comment.author.memberFirstName} ${comment.author.memberLastName}`
                              : "Anonymous Collector"}
                          </p>
                          <p className="text-xs text-slate-500 uppercase tracking-wider">
                            Member • {comment.createdAt?.toString() || "N/A"}
                          </p>
                        </div>
                        <div className="flex gap-0.5 text-primary">
                          {[...Array(3)].map((_, i) => (
                            <span key={i} className="text-lg">
                              {i < comment.rating ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 italic leading-relaxed">
                        "{comment.content}"
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side - Feedback Form */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="p-8 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-black mb-2">SHARE YOUR EXPERIENCE</h3>
            <p className="text-xs text-slate-500 mb-6">
              Members are invited to contribute to our archive.
            </p>

            {hasCommented && (
              <div className="mb-6 p-4 bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-400 rounded-lg text-sm">
                You have already provided feedback for this perfume.
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-400 rounded-lg text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Scent Rating */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                  Scent Rating
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      disabled={!user || hasCommented}
                      className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all ${
                        rating === star
                          ? "bg-primary text-white shadow-lg scale-105"
                          : "bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 hover:border-primary"
                      } ${!user || hasCommented ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {star} ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Your Reflection */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                  Your Reflection
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={!user || hasCommented}
                  placeholder="Describe the atmosphere, longevity, and notes..."
                  className="w-full h-32 px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:border-primary focus:outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Anonymous Checkbox */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    disabled={!user || hasCommented}
                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Post as anonymous collector
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!user || hasCommented || loading}
                className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white font-bold py-4 rounded-lg uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Archive Feedback"}
              </Button>

              {/* Warning Message */}
              <div className="mt-6 flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-lg">
                <div className="flex-shrink-0 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-xs text-orange-700 dark:text-orange-400 uppercase tracking-wide">
                  Only verified members of the Maison population can contribute
                  to product feedback.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
