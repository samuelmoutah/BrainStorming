import * as React from 'react';
import classNames from 'classnames';

/**
 * A fontawesome icon.
 *
 * For documentation, see https://fontawesome.com/v4.7.0/
 *
 */
export default function Icon(props: IconProps) {
    const { name, className, style: initialStyle, size = null, ...rest } = props;

    const style = initialStyle || {};

    if (rest.onClick) {
        style.cursor = 'pointer';
    }
    const trueClassName = classNames(className, `fa fa-${props.name}`, size !== null ? `fa-${size}x` : '');

    return <i className={trueClassName} aria-hidden="true" style={style} {...rest} />;
}

export interface IconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    /**
     * The name of the icon. This is the part after `fa fa-`
     */
    name: string;
    size?: number;
}
