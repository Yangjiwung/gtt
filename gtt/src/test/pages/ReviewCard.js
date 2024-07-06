import {
    Card,
    CardBody,
    Rating,
    Typography,
} from "@material-tailwind/react";

interface ReviewCardPropsType {
    title: string;
    name: string;
    feedback: string;
    date: string;
}

export function CardReview({
                               name,
                               feedback,
                               date,
                               title,
                           }: ReviewCardPropsType) {
    return (
        <Card shadow={false}>
            <CardBody className="pt-0">
                <Rating value={4} className="text-amber-500" />
                <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-bold mb-2 mt-1"
                >
                    {title}
                </Typography>
                <Typography className="text-base font-normal !text-gray-500">
                    {feedback}
                </Typography>
                <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-medium mt-3"
                >
                    {name}
                </Typography>
                <Typography
                    variant="small"
                    className="font-normal !text-gray-500"
                >
                    {date}
                </Typography>
            </CardBody>
        </Card>
    );
}

const CONTENTS = [
    {
        title: "This tool has made my workflow seamless",
        name: "Ryan Samuel",
        feedback:
            "I've been using this for a while now, and it's become an essential part of my daily routine. It's incredibly user-friendly and has greatly improved my productivity.",
        date: "03 March 2024",
    },
    {
        title: "It's made my job so much easier",
        name: "Emma Roberts",
        feedback:
            "This tool has been a game-changer for me. From managing my tasks to collaborating with my team, it's made everything so much easier. Highly recommended!",
        date: "14 February 2023",
    },
    {
        title: "It's my go-to solution for staying organized.",
        name: "Bruce Mars",
        feedback:
            "I've been using this for a while now, and it's become an essential part of my daily routine. It's incredibly user-friendly and has greatly improved my productivity.",
        date: "10 February 2023",
    },
];
export function OverviewSection3() {
    return (
        <section className="py-20 px-8">
            <div className="mx-auto container">
                <div className="text-center">
                    <Typography variant="h6" className="mb-3 uppercase">
                        Reviews
                    </Typography>
                    <Typography variant="h3">Our Customer&apos;s Opinion</Typography>
                    <Typography className="mt-3 text-center text-[18px] font-normal text-gray-500">
                        From general feedback to detailed accounts, find out why our users
                        love our product.
                    </Typography>
                </div>
                <div className="mt-32 grid lg:grid-cols-3 grid-cols-1 gap-y-6">
                    {CONTENTS.map(({ name, feedback, title, date }, index) => (
                        <CardReview
                            key={index}
                            title={title}
                            name={name}
                            feedback={feedback}
                            date={date}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default OverviewSection3;
