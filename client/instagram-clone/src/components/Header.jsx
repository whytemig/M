import { Link } from "react-router-dom";

export default function Header({
	heading,
	paragraph,
	linkName,
	linkUrl = "#",
}) {
	return (
		<div className="mb-10">
			<div className="flex justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
			<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
				{heading}
			</h2>
			<p className="mt-2 text-center text-sm text-gray-600 mt-5">
				{paragraph}{" "}
				<Link
					to={linkUrl}
					className="font-medium text-gray-600 hover:text-gray-500"
				>
					{linkName}
				</Link>
			</p>
		</div>
	);
}
