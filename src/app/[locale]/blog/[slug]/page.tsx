'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
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

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  image: string;
  category: string;
  tags: string[];
  readTime: number;
}

interface BlogResponse {
  success: boolean;
  data: Blog;
}

export default function BlogDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations('blog');
  const slug = params?.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        // Send language parameter based on locale
        const res = await fetch(`${API_BASE_URL}/blogs/${slug}?lang=${locale}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch blog');
        }

        const data: BlogResponse = await res.json();
        
        if (data.success && data.data) {
          setBlog(data.data);
        } else {
          setError(t('notFound'));
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(t('failedToLoad'));
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, locale]); // Add locale to dependencies to reload when language changes

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

  const formatContent = (content: string) => {
    // Split content by double newlines to create paragraphs
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    return paragraphs.map((paragraph, index) => {
      // Check if paragraph is a heading (starts with **)
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        const headingText = paragraph.slice(2, -2);
        return (
          <h3 key={index} className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mt-4 sm:mt-6">
            {headingText}
          </h3>
        );
      }
      
      // Check if paragraph is a list item (starts with - or *)
      if (paragraph.trim().startsWith('- ') || paragraph.trim().startsWith('* ')) {
        const items = paragraph.split('\n').filter(item => item.trim().startsWith('- ') || item.trim().startsWith('* '));
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-neutral-700 dark:text-neutral-300">
            {items.map((item, itemIndex) => (
              <li key={itemIndex}>{item.replace(/^[-*]\s+/, '')}</li>
            ))}
          </ul>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed mt-0">
          {paragraph}
        </p>
      );
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || t('notFound')}</p>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            {t('backToBlog')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm">
          {/* Blog Header Image */}
        {blog.image && (() => {
          // Construct image URL - if it starts with http, use as-is
          // Otherwise, construct URL from backend API using env-based URL
          let imageUrl = blog.image;
          if (!imageUrl.startsWith('http')) {
            // Remove leading slash if present
            const imagePath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
            // Get backend base URL from environment
            const backendBase = getBackendBaseUrl();
            imageUrl = `${backendBase}${imagePath}`;
          }
          return (
            <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700">
              <Image
                src={imageUrl}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
          );
        })()}
        <div className="p-5 md:p-6">
        {/* Blog Header */}
        <div className="mb-8">
          {/* Category */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-50 rounded-full">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>{formatDate(blog.publishedAt)}</span>
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 text-sm text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded-full"
                >
                  <TagIcon className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Blog Content */}
        <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
          <div className="">
            <div className="text-neutral-700 dark:text-neutral-300">
              {formatContent(blog.content)}
            </div>
          </div>
        </article>
        </div>
        </div>
      </div>
    </div>
  );
}

