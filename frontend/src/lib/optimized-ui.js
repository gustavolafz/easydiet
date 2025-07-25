// Importações otimizadas de bibliotecas UI
// Este arquivo centraliza e otimiza as importações para reduzir o bundle size

import React, { lazy, Suspense } from 'react';

// Radix UI Icons - importação seletiva
export {
  CheckIcon,
  Cross2Icon,
  ChevronRightIcon,
  InfoCircledIcon,
  PersonIcon,
  BellIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  PlusIcon,
  TrashIcon,
  Pencil1Icon,
  Pencil2Icon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  DashboardIcon,
  HamburgerMenuIcon,
  HeartIcon,
  DotsHorizontalIcon,
  ArrowRightIcon,
  DoubleArrowRightIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircledIcon,
  BarChartIcon,
  Share2Icon,
  EnvelopeClosedIcon,
  MixerHorizontalIcon,
} from '@radix-ui/react-icons';

// Lucide React - importação seletiva
export {
  Search,
  Loader2,
  Plus,
  Trash2,
} from 'lucide-react';

// Framer Motion - re-export otimizado
export { motion, AnimatePresence } from 'framer-motion';

// Utilitário para lazy loading de componentes pesados
export const lazyLoad = (importFunc, fallback = null) => {
  const LazyComponent = lazy(importFunc);
  
  const LazyWrapper = (props) => (
    <Suspense fallback={fallback || <div>Carregando...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );

  LazyWrapper.displayName = 'LazyWrapper';
  
  return LazyWrapper;
}; 