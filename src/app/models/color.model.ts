export type ColorClassOptions = 'default' |'primary' | 'success' | 'danger' | 'gray';

export enum ColorClass  {
    default = 'text-gray-600 bg-gray-200 hover:bg-gray-300 focus:ring-gray-300',
    primary = 'text-white bg-primary-500 hover:bg-primary-600 focus:ring-primary-300',
    success = 'text-white bg-success-500 hover:bg-success-600 focus:ring-success-300',
    danger = 'text-white bg-red-500 hover:bg-red-600 focus:ring-red-300',
    gray = 'text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-300',
}

export enum TextAlign {
    left = 'text-left',
    center = 'text-center',
    right = 'text-right',
}