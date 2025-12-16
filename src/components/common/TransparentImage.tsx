import React, { useEffect, useState, useRef } from 'react';
import { clsx } from 'clsx';

interface TransparentImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    threshold?: number; // 0-255, how "white" a pixel needs to be to become transparent
}

export const TransparentImage: React.FC<TransparentImageProps> = ({
    src,
    threshold = 30, // Default tolerance
    className,
    alt,
    ...props
}) => {
    const [processedSrc, setProcessedSrc] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = src;

        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Set canvas dimensions
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw original image
            ctx.drawImage(img, 0, 0);

            // Get pixel data
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Loop through pixels
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                // data[i + 3] is alpha

                // Check if pixel is white-ish
                // White is (255, 255, 255). We check if it's close to that.
                if (r > 255 - threshold && g > 255 - threshold && b > 255 - threshold) {
                    data[i + 3] = 0; // Set alpha to 0 (transparent)
                }
            }

            // Put processed data back
            ctx.putImageData(imageData, 0, 0);

            // Convert to data URL
            setProcessedSrc(canvas.toDataURL());
        };
    }, [src, threshold]);

    return (
        <>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <img
                src={processedSrc || src} // Fallback to original while processing or if failed
                alt={alt}
                className={clsx(className, !processedSrc && "opacity-0 transition-opacity duration-300", processedSrc && "opacity-100")}
                {...props}
            />
        </>
    );
};
