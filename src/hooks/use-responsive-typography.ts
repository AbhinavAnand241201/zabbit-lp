"use client";
import { useState, useEffect } from "react";
import {
  adjustTypography,
  type AdjustTypographyInput,
} from "@/ai/flows/responsive-typography";

type UseResponsiveTypographyOptions = Omit<
  AdjustTypographyInput,
  "deviceWidth" | "deviceHeight"
>;

export function useResponsiveTypography(
  options: UseResponsiveTypographyOptions
) {
  const [styles, setStyles] = useState({
    fontSize: options.baseFontSize,
    lineHeight: `${options.baseLineHeight}px`,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStyles = async () => {
      setIsLoading(true);
      try {
        const responsiveStyles = await adjustTypography({
          ...options,
          deviceWidth: window.innerWidth,
          deviceHeight: window.innerHeight,
        });
        setStyles({
          fontSize: responsiveStyles.fontSize,
          lineHeight: `${responsiveStyles.lineHeight}px`,
        });
      } catch (error) {
        console.error("Failed to adjust typography:", error);
        // Fallback to base styles on error
        setStyles({
          fontSize: options.baseFontSize,
          lineHeight: `${options.baseLineHeight}px`,
        });
      } finally {
        setIsLoading(false);
      }
    };

    getStyles();
    // The dependency array is intentionally limited.
    // We only want this to run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { styles, isLoading };
}
