import {Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, Typography} from "@material-tailwind/react";
import {useState} from "react";

const ProjectImageComponent = () => {

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const handleOpen = (imageSrc) => {
        setSelectedImage(imageSrc);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const images = [
        {
            src: "/img/남태욱.jpg",
            caption: "남태욱",
        },
        {
            src: "/img/양지웅.jpg",
            caption: "양지웅",
        },
        {
            src: "/img/전필우.jpg",
            caption: "전필우",
        },
        {
            src: "/img/1조.jpg",
            caption: "1조사진",
        },
    ];

    return (
        <div className="mb-16 text-center lg:mb-28 w-full">
            <Typography variant="h1" color="blue-gray" className="my-2 !text-2xl lg:!text-3xl mb-6">
                프로젝트의 추억
            </Typography>
            <div className="flex flex-wrap justify-center gap-4">
                {images.map((image, index) => (
                    <figure
                        key={index}
                        className="flex flex-col items-center mb-4 p-2 cursor-pointer"
                        style={{ flexBasis: "calc(25% - 1rem)" }}
                        onClick={() => handleOpen(image.src)}
                    >
                        <img
                            className="h-48 w-full rounded-lg object-cover object-center"
                            src={image.src}
                            alt={`image ${index + 1}`}
                        />
                        <Typography as="caption" variant="small" className="mt-2 text-center font-normal">
                            {image.caption}
                        </Typography>
                    </figure>
                ))}
            </div>

            <Dialog
                open={open}
                handler={handleOpen}
                size="lg"
                className="max-w-md mx-auto my-10"
                style={{ maxWidth: "90vw", maxHeight: "90vh" }}
            >
                <DialogHeader>1조 사진</DialogHeader>
                <DialogBody divider className="overflow-auto" style={{ maxHeight: "70vh" }}>
                    <img src={selectedImage} alt="Enlarged view" className="w-full h-auto max-w-full" />
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleClose} className="mr-1">
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default ProjectImageComponent;