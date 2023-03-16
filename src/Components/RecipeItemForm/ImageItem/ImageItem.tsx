import React from "react";
import {
  ImageDelete,
  ImageItemTag,
  ImageTag,
  ImageText,
} from "./ImageItem.style";

interface ImageItemProps {
  index: number;
  image: string;
  onDeleteImage: (index: number) => void;
}

export const ImageItem = ({ index, image, onDeleteImage }: ImageItemProps) => {
  return (
    <>
      <ImageItemTag key={index}>
        <ImageText>Image {index + 1}:</ImageText>{" "}
        <ImageTag src={image} alt="" />
        <ImageDelete onClick={() => onDeleteImage(index)}>X</ImageDelete>
      </ImageItemTag>
    </>
  );
};
