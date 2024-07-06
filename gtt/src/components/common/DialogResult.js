import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export function DialogResult({ title, content, callbackFn, open, setOpen }) {

    const handleClose = () => setOpen(false); // 대화 상자 닫기

    return (
        <>
            <Dialog open={open} handler={handleClose}>
                <DialogHeader>{title}</DialogHeader>
                <DialogBody>{content}</DialogBody>
                <DialogFooter>
                 {/*   <Button variant="text" color="red" onClick={handleClose} className="mr-1">
                        <span>취소</span>
                    </Button>*/}
                    <Button variant="gradient" color="blue" onClick={() => {
                        if (callbackFn) {
                            callbackFn();
                        }
                        handleClose(); // 확인 후 대화 상자 닫기
                    }}>
                        <span>확인</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
