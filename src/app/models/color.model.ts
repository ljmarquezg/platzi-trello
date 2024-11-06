export type Colors = 'default' |'primary' | 'success' | 'danger' | 'gray' | 'sky' | 'green' | 'violet' | 'yellow';

export type objectColors = Record<Colors, string>;

export const COLORS: objectColors  = {
    default:'text-gray-600 bg-gray-200 hover:bg-gray-300 focus:ring-gray-300',
    primary: 'text-white bg-primary-500 hover:bg-primary-600 focus:ring-primary-300',
    success: 'text-white bg-success-500 hover:bg-success-600 focus:ring-success-300',
    danger: 'text-white bg-red-500 hover:bg-red-600 focus:ring-red-300',
    gray: 'text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-300',
    sky: 'text-white bg-sky-500 hover:bg-sky-600 focus:ring-sky-300',
    green: 'text-white bg-green-500 hover:bg-green-600 focus:ring-green-300',
    violet: 'text-white bg-violet-500 hover:bg-violet-600 focus:ring-violet-300',
    yellow:'text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300',
}

export enum TextAlign {
    left = 'text-left',
    center = 'text-center',
    right = 'text-right',
}