import { useDropzone } from "react-dropzone";
import { StyledFlexBox } from "../../styles/Shared.styles";

const ExcelFileUpload = ({ multiple = false, accept, onDrop, children }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  });
  return (
    <StyledFlexBox
      cursor="pointer"
      {...getRootProps()}
      border="1px dashed #E9E9E9"
      borderRadius="6px"
      width={171}
      height={200}
      justifyContent="center"
      alignItems="center"
      color="#a7a7a7"
      textAlign="center"
      lineHeight="20px"
    >
      <input {...getInputProps()} />
      {children}
    </StyledFlexBox>
  );
};

export default ExcelFileUpload;
