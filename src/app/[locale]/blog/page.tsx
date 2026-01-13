'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, ClockIcon, TagIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Loading from '@/components/shared/Loading';
import { useLocale, useTranslations } from 'next-intl';

// Compute API base URL (same as utils/api.ts but inline for this component)
function computeApiBase(): string {
  const raw = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE || "").trim();

  if (raw) {
    return raw.replace(/\/$/, "");
  }

  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return `${window.location.protocol}//${window.location.hostname}:4000/api/v1`;
  }

  return "https://inlandandalucia.onrender.com/api/v1";
}

const API_BASE_URL = computeApiBase();

// Helper function to get backend base URL for images (extracts from API_BASE_URL)
function getBackendBaseUrl(): string {
  // Remove /api/v1 from API_BASE_URL to get base URL
  return API_BASE_URL.replace('/api/v1', '').replace(/\/$/, '');
}
const BLOGS_PER_PAGE = 9;

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  image: string;
  category: string;
  tags: string[];
  readTime: number;
}

interface BlogListResponse {
  success: boolean;
  data: Blog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function BlogPage() {
  const locale = useLocale();
  const t = useTranslations('blog');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: BLOGS_PER_PAGE,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Send language parameter based on locale
        const res = await fetch(`${API_BASE_URL}/blogs?page=${currentPage}&limit=${BLOGS_PER_PAGE}&lang=${locale}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch blogs');
        }

        const data: BlogListResponse = await res.json();
        
        if (data.success) {
          setBlogs(data.data);
          setPagination(data.pagination);
        } else {
          setError(t('failedToLoad'));
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(t('failedToLoad'));
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, locale]); // Add locale to dependencies to reload when language changes

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Map locale to date locale format
    const dateLocale: Record<string, string> = {
      'en': 'en-US',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'pt': 'pt-PT',
      'de': 'de-DE',
    };
    return date.toLocaleDateString(dateLocale[locale] || 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            {t('retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
            {t('title')}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            {t('subtitle')}
          </p>
        </div>

        {/* Blog Grid */}
        {loading && blogs.length === 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: BLOGS_PER_PAGE }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 w-full bg-neutral-200 dark:bg-neutral-700"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4"></div>
                  <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400">
              {t('noPosts')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => {
              // Construct image URL - if it starts with http, use as-is
              // Otherwise, construct URL from backend API using env-based URL
              let imageUrl = blog.image || '';
              if (imageUrl && !imageUrl.startsWith('http')) {
                // Remove leading slash if present
                const imagePath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
                // Get backend base URL from environment
                const backendBase = getBackendBaseUrl();
                imageUrl = `${backendBase}${imagePath}`;
              }
              
              return (
                <Link
                  key={blog.id}
                  href={`/${locale}/blog/${blog.slug}`}
                  className="group bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Blog Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                    <div className="flex items-center justify-center h-full text-neutral-400">
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    )}
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                  {/* Category */}
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-50 dark:bg-primary-900/20 rounded-full">
                      {blog.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{formatDate(blog.publishedAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 rounded"
                        >
                          <TagIcon className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination with Results Count - Using same pattern as properties */}
        {(pagination.totalPages > 1 || (!loading && blogs.length > 0)) && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Results Count - Left Side */}
            {!loading && blogs.length > 0 && (
              <div className="flex items-center">
                <p className="text-base text-neutral-600 dark:text-neutral-400">
                  {t('pagination.showing')}{' '}
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {(currentPage - 1) * BLOGS_PER_PAGE + 1}
                  </span>{' '}
                  -{' '}
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {Math.min(currentPage * BLOGS_PER_PAGE, pagination.total)}
                  </span>{' '}
                  {t('pagination.of')}{' '}
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {pagination.total}
                  </span>{' '}
                  {pagination.total === 1 ? t('pagination.post') : t('pagination.posts')}
                </p>
              </div>
            )}

            {/* Pagination - Right Side */}
            {pagination.totalPages > 1 && (
              <nav className="flex items-center gap-1" aria-label="Pagination">
              {/* Previous Button */}
              <button
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                disabled={currentPage === 1 || loading}
                className="relative inline-flex items-center rounded-md px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed dark:text-neutral-500 dark:ring-neutral-700 dark:hover:bg-neutral-800 dark:disabled:hover:bg-neutral-900 transition-colors"
              >
                <span className="sr-only">{t('pagination.previous')}</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Page Numbers */}
              {(() => {
                const pageNumbers: (number | string)[] = [];
                const maxVisiblePages = 7;
                const sidePages = 2;
                const total = pagination.totalPages;

                if (total <= maxVisiblePages) {
                  for (let i = 1; i <= total; i++) pageNumbers.push(i);
                } else {
                  pageNumbers.push(1);
                  let middleStart = Math.max(2, currentPage - sidePages);
                  let middleEnd = Math.min(total - 1, currentPage + sidePages);

                  if (currentPage <= sidePages + 2) {
                    middleEnd = maxVisiblePages - 2;
                    if (middleEnd >= total - 1) middleEnd = total - 1;
                  }
                  if (currentPage >= total - (sidePages + 1)) {
                    middleStart = total - (maxVisiblePages - 1);
                    if (middleStart <= 2) middleStart = 2;
                  }

                  if (middleStart > 2) pageNumbers.push('ellipsis1');
                  for (let i = middleStart; i <= middleEnd; i++) pageNumbers.push(i);
                  if (middleEnd < total - 1) pageNumbers.push('ellipsis2');
                  if (total > 1) pageNumbers.push(total);
                }

                return pageNumbers.map((pageNumber, index) =>
                  pageNumber === 'ellipsis1' || pageNumber === 'ellipsis2' ? (
                    <span
                      key={`${pageNumber}-${index}`}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300"
                    >
                      <EllipsisHorizontalIcon className="h-5 w-5" />
                    </span>
                  ) : (
                    <button
                      key={pageNumber}
                      onClick={() => {
                        setCurrentPage(pageNumber as number);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={loading}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed ${
                        currentPage === pageNumber
                          ? 'z-10 bg-primary-600 text-white'
                          : loading
                            ? 'text-neutral-400 ring-1 ring-inset ring-neutral-300 dark:text-neutral-500 dark:ring-neutral-700'
                            : 'text-neutral-900 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 dark:text-neutral-100 dark:ring-neutral-700 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ),
                );
              })()}

              {/* Next Button */}
              <button
                onClick={() => {
                  if (currentPage < pagination.totalPages) {
                    setCurrentPage(currentPage + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                disabled={currentPage === pagination.totalPages || loading}
                className="relative inline-flex items-center rounded-md px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed dark:text-neutral-500 dark:ring-neutral-700 dark:hover:bg-neutral-800 dark:disabled:hover:bg-neutral-900 transition-colors"
              >
                <span className="sr-only">{t('pagination.next')}</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

