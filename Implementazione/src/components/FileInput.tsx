import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import deleteImg from "../assets/delete.svg";

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  files: { preview: string }[];
  setFiles: (
    value: { preview: string }[] | ((prevVar: { preview: string }[]) => { preview: string }[])
  ) => void;
  maxFiles: number;
}

const FileInput = ({ files, setFiles, maxFiles, ...others }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles((files) => [
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    maxFiles,
  });

  const thumbs = files.map((file, i) => (
    <div className="inline-flex" key={`img-${i}`}>
      <div className="relative">
        <img src={file.preview} alt="" className="block h-full w-[260px]" />
        <img
          className="absolute top-[5px] right-[5px] cursor-pointer w-[22px] h-[22px] p-[1px] hover:bg-[#3f3f3f88]"
          data-idx={i}
          onClick={(e) => {
            e.stopPropagation();
            let id = parseInt(e.currentTarget.dataset.idx!);
            setFiles((files) => [...files.filter((_, i) => i !== id)]);
          }}
          alt=""
          src={deleteImg}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div {...getRootProps()} className="cursor-pointer input py-2 px-3">
      <input {...getInputProps()} name="foto" {...others} />
      {isDragActive ? (
        <p>Trascina qui le immagini ...</p>
      ) : (
        <p>Trascina qui le immagini o clicca per selezionarle</p>
      )}
      <aside className={`grid grid-cols-[repeat(2,auto)] gap-2 ${files.length !== 0 && "mt-4"} `}>
        {thumbs}
      </aside>
    </div>
  );
};

export default FileInput;
