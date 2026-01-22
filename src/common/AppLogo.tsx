
import React from 'react';
import DarkLogo from '@/public/logo/logo-dark.png';
import LightLogo from '@/public/logo/logo-light.png';
import { cn } from '@/common/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const logoSizes = {
    small: 50,
    medium: 100,
    large: 300
};

type Props = {
    size?: 'small' | 'medium' | 'large'
    href?: string
} & React.ComponentProps<"img">;

export const AppLogoTheme = ({ size = 'medium', ...props }: Props) => {
    return (
        <div>
            <AppLogoDark className='block dark:hidden' {...props} size={size} />
            <AppLogoLight className='hidden dark:block' {...props} size={size} />
        </div>
    )
};

export const AppLogoLight = ({ size = 'medium', href = '/', ...props }: Props) => {

    const logoSize = logoSizes[size];

    return (
        <Link href={href}>
            <Image
                {...props}
                priority={true}
                className={cn('select-none cursor-pointer size-', props.className)}
                width={logoSize}
                height={logoSize}
                src={LightLogo}
                alt="logo"
            />
        </Link>

    );
}

export const AppLogoDark = ({ size = 'medium', href = '/', ...props }: Props) => {

    const logoSize = logoSizes[size];




    return (
        <Link href={href}>
            <Image
                {...props}
                priority={true}
                className={cn('select-none cursor-pointer', props.className)}
                width={logoSize}
                height={logoSize}
                src={DarkLogo}
                alt="logo"
            />
        </Link>
    );
}
