"use client";

import { ForwardedRef, forwardRef, useMemo } from "react";
import { mergeProps } from "react-aria";
import { Button } from "react-aria-components";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, EllipsisIcon } from "./icons";
import { ColorProps, RadiusProps, SizeProps, StyleProps, StyleSlotsToStyleProps } from "./types";
import { isDisabledVariants, isFocusVisibleVariants, radiusVariants } from "./styles";

// styles

const paginationStyles = tv({
  slots: {
    base: "flex flex-wrap",
    item: "flex items-center justify-center bg-opacity-0 text-default-1000 cursor-pointer outline-none duration-300",
  },
  variants: {
    color: {
      default: { item: "bg-default-1000 text-default-1000" },
      "default-inverted": { item: "bg-default-0 text-default-0" },
      primary: { item: "bg-primary-500 text-primary-500" },
      info: { item: "bg-info-500 text-info-500" },
      success: { item: "bg-success-500 text-success-500" },
      warning: { item: "bg-warning-500 text-warning-500" },
      error: { item: "bg-error-500 text-error-500" },
    },
    size: {
      sm: { base: "gap-2", item: "h-8 min-w-8 gap-x-2 px-2 text-xs [&_svg]:size-4" },
      md: { base: "gap-2.5", item: "h-10 min-w-10 gap-x-2.5 px-2.5 text-sm [&_svg]:size-5" },
      lg: { base: "gap-3", item: "h-12 min-w-12 gap-x-3 px-3 text-base [&_svg]:size-6" },
    },
    radius: {
      sm: { item: radiusVariants.radius.sm },
      md: { item: radiusVariants.radius.md },
      lg: { item: radiusVariants.radius.lg },
      full: { item: radiusVariants.radius.full },
      none: { item: radiusVariants.radius.none },
    },
    isHovered: { true: { item: "bg-opacity-10" } },
    isPressed: { true: { item: "scale-95" } },
    isSelected: { true: { item: "bg-opacity-100 text-default-0" } },
    isDisabled: { true: { item: isDisabledVariants.isDisabled.true } },
    isFocusVisible: { true: { item: isFocusVisibleVariants.isFocusVisible.true } },
  },
});

type PaginationStylesReturnType = ReturnType<typeof paginationStyles>;

// props

interface PigmentPaginationProps extends ColorProps, SizeProps, RadiusProps, StyleProps, StyleSlotsToStyleProps<PaginationStylesReturnType> {
  total: number;
  page: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  dotsJump?: number;
}

// component

function _Pagination(props: PigmentPaginationProps, ref: ForwardedRef<HTMLUListElement>) {
  const {
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

  const styleSlots = paginationStyles({ color, size, radius });

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
    <ul ref={ref} className={styleSlots.base({ className: twMerge(classNames?.base, className) })} style={mergeProps(styles?.base, style)}>
      <li>
        <Button aria-label="Previous page" isDisabled={page === 1} onPress={onPrevious} className={(renderProps) => styleSlots.item(renderProps)}>
          <ChevronLeftIcon />
        </Button>
      </li>

      {paginationRange.map((pageNumber, index) => (
        <li key={index}>
          {pageNumber === "DOTS_PREVIOUS" ? (
            <Button
              aria-label="Previous dots"
              onPress={() => onChange(page - dotsJump > 1 ? page - dotsJump : 1)}
              className={(renderProps) => styleSlots.item(renderProps)}
            >
              {({ isHovered }) => (isHovered ? <ChevronsLeftIcon /> : <EllipsisIcon />)}
            </Button>
          ) : pageNumber === "DOTS_NEXT" ? (
            <Button
              aria-label="Next dots"
              onPress={() => onChange(page + dotsJump < lastPage ? page + dotsJump : lastPage)}
              className={(renderProps) => styleSlots.item(renderProps)}
            >
              {({ isHovered }) => (isHovered ? <ChevronsRightIcon /> : <EllipsisIcon />)}
            </Button>
          ) : (
            <Button
              aria-label={`Page ${pageNumber}`}
              onPress={() => onChange(pageNumber)}
              className={(renderProps) => styleSlots.item({ ...renderProps, isSelected: pageNumber === page })}
            >
              {pageNumber}
            </Button>
          )}
        </li>
      ))}

      <li>
        <Button aria-label="Next page" isDisabled={page === lastPage} onPress={onNext} className={(renderProps) => styleSlots.item(renderProps)}>
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
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and total. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < total - 2
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
export type { PigmentPaginationProps };
