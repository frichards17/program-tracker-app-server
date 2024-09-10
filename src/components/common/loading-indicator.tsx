import { LoaderCircle } from "lucide-react"

const LoadingIndicator = () => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoaderCircle className="animate-spin w-12 h-12" />
        </div>
    )
}

export default LoadingIndicator