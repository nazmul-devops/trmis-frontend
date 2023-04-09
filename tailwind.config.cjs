const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	prefix: "t-",
	important: true,

	theme: {
		extend: {
			borderWidth:{
				'1.5px': '1.5px'
			},
			borderColor:{
				'customColor': '#CED0D6'
			}
		},
		
        screens: {
            sm: "375px",

            md: "768px",

            lg: "1100px",

            xl: "1280px",

            "2xl": "1536px",
        },
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				md: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			  },
		},
	},

	plugins: []
};

module.exports = config;
