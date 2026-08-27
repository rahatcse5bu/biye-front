// import React from 'react';
import { Colors } from "../../../constants/colors";
function PrivacyPolicy() {
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-screen-md mx-auto bg-white p-6 rounded-lg shadow-md">
				<h1
					className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-8"
					style={{ color: Colors.titleText }}
				>
					Privacy Policy
				</h1>

				<p className="text-gray-700 mb-6">
					Your privacy is important to us. It is our policy to respect your
					privacy regarding any information we may collect from you across our
					website.
				</p>

				<h2 className="text-2xl font-semibold mb-4">
					1. Information We Collect
				</h2>
				<p className="text-gray-700 mb-6">
					We may collect personal information that you voluntarily provide to us
					when you use our website.
				</p>

				<h2 className="text-2xl font-semibold mb-4">2. Use of Information</h2>
				<p className="text-gray-700 mb-6">
					We may use your personal information for various purposes, including
					improving our services and communicating with you.
				</p>

				<h2 className="text-2xl font-semibold mb-4">3. Security</h2>
				<p className="text-gray-700 mb-6">
					We are committed to ensuring that your information is secure. We use
					industry-standard security measures to protect your personal
					information.
				</p>

				<h2 className="text-2xl font-semibold mb-4">4. Third-Party Links</h2>
				<p className="text-gray-700 mb-6">
					Our website may contain links to third-party websites. We have no
					control over the content or privacy policies of these websites.
				</p>

				<h2 className="text-2xl font-semibold mb-4">
					5. Changes to Privacy Policy
				</h2>
				<p className="text-gray-700 mb-6">
					We may update our Privacy Policy from time to time. Any changes will
					be reflected on this page.
				</p>

				<h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
				<p className="text-gray-700">
					If you have any questions or concerns about our Privacy Policy, please
					contact us.
				</p>
			</div>
		</div>
	);
}

export default PrivacyPolicy;
