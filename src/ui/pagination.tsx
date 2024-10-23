"use client";

import { ForwardedRef, forwardRef, useMemo } from "react";
import { mergeProps } from "react-aria";
import { Button } from "react-aria-components";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, EllipsisIcon } from "lucide-react";

import { ColorProps, RadiusProps, SizeProps, StyleProps, StyleSlotsToStyleProps, Variants } from "./types";
import { radiusVariants, variantColorStyles } from "./styles";

// styles

const paginationStyles = tv({
  extend: variantColorStyles,
  slots: {
    base: "grid place-items-center duration-300",
    wrapper: "flex flex-wrap",
  },
  variants: {
    size: {
      sm: { wrapper: "gap-2", base: "size-8 text-xs [&_svg]:size-4" },
      md: { wrapper: "gap-2.5", base: "size-10 text-sm [&_svg]:size-5" },
      lg: { wrapper: "gap-3", base: "size-12 text-base [&_svg]:size-6" },
    },
    isSelected: { true: "!text-default-0" },
    radius: radiusVariants,
  },
  compoundVariants: [
    { isSelected: true, color: "default", className: "!bg-default-1000 !border-default-1000" },
    { isSelected: true, color: "primary", className: "!bg-primary-500 !border-primary-500" },
    { isSelected: true, color: "info", className: "!bg-info-500 !border-info-500" },
    { isSelected: true, color: "success", className: "!bg-success-500 !border-success-500" },
    { isSelected: true, color: "warning", className: "!bg-warning-500 !border-warning-500" },
    { isSelected: true, color: "error", className: "!bg-error-500 !border-error-500" },
  ],
});

type PaginationStylesReturnType = ReturnType<typeof paginationStyles>;

// props

interface PaginationProps extends ColorProps, SizeProps, RadiusProps, StyleProps, StyleSlotsToStyleProps<PaginationStylesReturnType> {
  variant?: Exclude<Variants, "solid">;
  total: number;
  page: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  dotsJump?: number;
}

// component

function _Pagination(props: PaginationProps, ref: ForwardedRef<HTMLUListElement>) {
  const {
    variant = "soft",
    color = "default",
    size = "md",
    radius = "md",
    total,
    page,
    onChange,
    siblingCount = 1,
    dotsJump = 5,
    className,
    classNames,
    style,
    styles,
  } = props;

  const styleSlots = paginationStyles({ variant, color, size, radius });

  const paginationRange = usePagination({ total, page, siblingCount });

  if (!paginationRange) {
    return null;
  }

  if (page === 0 || paginationRange.length < 2) {
    return null;
  }

  const onPrevious = () => {
    onChange(page - 1);
  };

  const onNext = () => {
    onChange(page + 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1] as number;

  return (
    <ul ref={ref} className={styleSlots.wrapper({ className: twMerge(classNames?.wrapper, className) })} style={mergeProps(styles?.wrapper, style)}>
      <li>
        <Button aria-label="Previous page" isDisabled={page === 1} onPress={onPrevious} className={(renderProps) => styleSlots.base(renderProps)}>
          <ChevronLeftIcon />
        </Button>
      </li>

      {paginationRange.map((pageNumber, index) => (
        <li key={index}>
          {pageNumber === "DOTS_PREVIOUS" ? (
            <Button
              aria-label="Previous dots"
              onPress={() => onChange(page - dotsJump > 1 ? page - dotsJump : 1)}
              className={(renderProps) => styleSlots.base(renderProps)}
            >
              {({ isHovered, isFocusVisible }) => (isHovered || isFocusVisible ? <ChevronsLeftIcon /> : <EllipsisIcon />)}
            </Button>
          ) : pageNumber === "DOTS_NEXT" ? (
            <Button
              aria-label="Next dots"
              onPress={() => onChange(page + dotsJump < lastPage ? page + dotsJump : lastPage)}
              className={(renderProps) => styleSlots.base(renderProps)}
            >
              {({ isHovered, isFocusVisible }) => (isHovered || isFocusVisible ? <ChevronsRightIcon /> : <EllipsisIcon />)}
            </Button>
          ) : (
            <Button
              aria-label={`Page ${pageNumber}`}
              onPress={() => onChange(pageNumber)}
              className={(renderProps) => styleSlots.base({ ...renderProps, isSelected: pageNumber === page })}
            >
              {pageNumber}
            </Button>
          )}
        </li>
      ))}

      <li>
        <Button aria-label="Next page" isDisabled={page === lastPage} onPress={onNext} className={(renderProps) => styleSlots.base(renderProps)}>
          <ChevronRightIcon />
        </Button>
      </li>
    </ul>
  );
}

const Pagination = forwardRef(_Pagination);

// hook

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

function usePagination({
  total,
  page,
  siblingCount = 1,
}: {
  total: number;
  page: number;
  siblingCount?: number;
}): (("DOTS_PREVIOUS" | "DOTS_NEXT") | number)[] | undefined {
  return useMemo(() => {
    // Pages count is determined as siblingCount + firstPage + lastPage + page + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1...total]
    */
    if (totalPageNumbers >= total) {
      return range(1, total);
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and total
    */
    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, total);

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and total. Hence, we are using leftSiblingIndex > 2 and rightSiblingIndex < total - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < total - 2;

    const firstPageIndex = 1;
    const lastPageIndex = total;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, "DOTS_NEXT", total];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(total - rightItemCount + 1, total);
      return [firstPageIndex, "DOTS_PREVIOUS", ...rightRange];
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "DOTS_PREVIOUS", ...middleRange, "DOTS_NEXT", lastPageIndex];
    }
  }, [total, page, siblingCount]);
}

// exports

export { Pagination };
