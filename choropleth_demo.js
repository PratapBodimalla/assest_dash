window.choropleth_demo = Object.assign({}, window.choropleth_demo, {
    heat: {
        StyleHandler: function (feature, context) {
            const {
                classes,
                colorscale,
                style,
                colorProp,
                selectedStates
            } = context.props.hideout; // get props from hideout
            const value = feature.properties[colorProp]; // get value the determines the color
            // console.log(feature, context, selectedStates)

            for (let i = 0; i < classes.length; ++i) {
                if (value) {
                    if (value >= classes[i]) {
                        style.fillColor = colorscale[i+1]; // set the fill color according to the class
                    }
                }
                else {
                    style.fillColor = colorscale[0];
                }
            }


            return style;
        },

        /* clickHandler: function(feature, context) {
            const {
                classes,
                colorscale,
                style,
                colorProp
            } = context.props.hideout; // get props from hideout
            const value = feature.properties[colorProp]; // get value the determines the color
            console.log(context['props'],feature)
            style.fillColor = "red" 
            return style;
        } */
    },
    heat_world: {
        StyleHandler: function (feature, context) {
            const {
                classes,
                colorscale,
                style,
                colorProp,
                selectedStates
            } = context.props.hideout; // get props from hideout
            const value = feature.properties[colorProp]; // get value the determines the color
            // console.log(feature, context, selectedStates)

            for (let i = 0; i < classes.length; ++i) {
                if (value) {
                    if (value >= classes[i]) {
                        style.fillColor = colorscale[i+1]; // set the fill color according to the class
                    }
                }
                else {
                    style.fillColor = colorscale[0];
                }
            }

            return style;
        }
    }
})