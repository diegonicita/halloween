import ButtonUpload from "./buttonUpload";

export default function CloudinaryLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<section>
			<div className="">
				<ButtonUpload />
			</div>
			{children}
		</section>
	);
}
