import { Heading } from "../shadcn-ui/heading";

export default function Header({ image }: { image: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-8">
            <img src={image} alt="Spokes Logo" width={100} height={100} />
            <Heading variant="h1">SPOKES</Heading>
        </div>

    )
}