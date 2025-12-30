'use client';

import { useTranslations } from 'next-intl';

const PageOverlayLoader = () => {
  const tCommon = useTranslations('common');

  return (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="text-neutral-600 font-medium">
          {tCommon('loadingProperties')}
        </p>
      </div>
    </div>
  );
};

export default PageOverlayLoader;
