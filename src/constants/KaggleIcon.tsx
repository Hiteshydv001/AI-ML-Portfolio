import { Icon, TablerIconsProps } from '@tabler/icons-react';

function IconBrandKaggleComponent(props: TablerIconsProps) {
  const { 
    stroke = 'currentColor',
    strokeWidth = 2,
    width = 24,
    height = 24,
    ...restProps
  } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={typeof stroke === 'string' ? stroke : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...restProps}
    >
      <path d="M4 4h4v16H4z" />
      <path d="M12 4h4l4 8-4 8h-4l4-8z" />
    </svg>
  );
}

IconBrandKaggleComponent.displayName = 'IconBrandKaggle';

export const IconBrandKaggle: Icon = IconBrandKaggleComponent as unknown as Icon;