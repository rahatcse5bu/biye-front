// import React from 'react';
import { Colors } from "../../../constants/colors";

function TermsAndConditions() {
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-screen-md mx-auto bg-white p-6 rounded-lg shadow-md">
				<h1
					className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-8"
					style={{ color: Colors.titleText }}
				>
					Terms and Conditions
				</h1>

				<p className="text-gray-700 mb-6">
					Please read these Terms and Conditions carefully before using our
					website. By accessing or using the service, you agree to be bound by
					these Terms. If you disagree with any part of the terms, please do not
					use our website.
				</p>

				<h2 className="text-2xl font-semibold mb-4">1. Use of Website</h2>
				<p className="text-gray-700 mb-6">
					This website is for general information and use only. It is subject to
					change without notice.
				</p>

				<h2 className="text-2xl font-semibold mb-4">2. Privacy Policy</h2>
				<p className="text-gray-700 mb-6">
					Your use of this website is also governed by our Privacy Policy.
					Please review our Privacy Policy to understand our practices.
				</p>

				<h2 className="text-2xl font-semibold mb-4">3. Content</h2>
				<p className="text-gray-700 mb-6">
					The content of this website is for your general information and use
					only. It is subject to change without notice.
				</p>

				<h2 className="text-2xl font-semibold mb-4">4. Disclaimer</h2>
				<p className="text-gray-700 mb-6">
					The use of any information or materials on this website is entirely at
					your own risk.
				</p>

				<h2 className="text-2xl font-semibold mb-4">
					5. Changes to Terms and Conditions
				</h2>
				<p className="text-gray-700 mb-6">
					We may revise these Terms and Conditions at any time without prior
					notice. By using this website, you are agreeing to be bound by the
					current version of these Terms and Conditions.
				</p>

				<h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
				<p className="text-gray-700">
					If you have any questions about these Terms and Conditions, please
					contact us.
				</p>
			</div>
		</div>
	);
}

export default TermsAndConditions;
