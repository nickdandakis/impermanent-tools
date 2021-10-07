/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";

import debounce from "../utils/debounce";

const useDebouncedCallback = (func, duration = 200, dependencies = []) =>
  useCallback(debounce(func, duration), [func, duration, ...dependencies]);

export default useDebouncedCallback;
