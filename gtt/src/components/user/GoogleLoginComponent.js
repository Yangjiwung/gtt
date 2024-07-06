import {Button} from "@material-tailwind/react";


const GoogleLoginComponent = ()=>{
    return(
        <Button
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2"
            fullWidth
        >
            <img
                src={`https://www.material-tailwind.com/logos/logo-google.png`}
                alt="google"
                className="h-6 w-6"
            />{" "}
            sign in with google
        </Button>
    )
}

export default GoogleLoginComponent
