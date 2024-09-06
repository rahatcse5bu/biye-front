// src/contexts/useUser.js

import { useContext } from 'react';
import { PrimaryFilterContext } from './PrimaryFilterContext';

export const usePrimary = () => useContext(PrimaryFilterContext);
