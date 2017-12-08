export interface ProductMedia{
    id: number;
    media_type: string;
    label: string;
    position: 1;
    disabled: boolean;
    /**
     * image;
      small_image;
      thumbnail
     */
    types: string[];
    file: string;
}