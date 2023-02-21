import { useDropzone } from "react-dropzone";
import { StyledFlexBox } from "../../styles/Shared.styles";

const FileUpload = ({ multiple = false, accept, onDrop, children }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  });
  return (
    <StyledFlexBox
      cursor="pointer"
      {...getRootProps()}
      height="50px"

    >
      <input {...getInputProps()} />
      {children}
    </StyledFlexBox>
  );
};

export default FileUpload;
