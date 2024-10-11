import PhotoCloudinary from "./photo";

export default function PageImageId({ params }: { params: { id: string } }) {
	return (
		<>
			<PhotoCloudinary id={params?.id} />
		</>
	);
}
