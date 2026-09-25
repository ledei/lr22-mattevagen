import { createContext, useContext } from 'react';
import { computeLayout, type StageLayout } from '@/lib/layout';

export const LayoutContext = createContext<StageLayout>(computeLayout(390, 844));

export const useLayout = () => useContext(LayoutContext);
