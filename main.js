/**
* Shorthand for creating Elements.
* @param {*} tag The tag name of the element.
* @param {*} [props] Optional props.
* @param {*} children Child elements or strings
*/
function h(tag, props, ...children) {
    let element = document.createElement(tag);
    if (props) {
        if (props.nodeType || typeof props !== "object") {
            children.unshift(props);
        }
        else {
            for (let name in props) {
                let value = props[name];
                if (name == "style") {
                    Object.assign(element.style, value);
                }
                else {
                    element.setAttribute(name, value);
                    element[name] = value;
                }
            }
        }
    }
    for (let child of children) {
        element.appendChild(typeof child === "object" ? child : document.createTextNode(child));
    }
    return element;
}

function onsubmit()
{
    let values = 
    {
        label_shape: label_shape.value,
        shape: shape.options[Math.max(0, shape.selectedIndex)].value,
        color: color.options[Math.max(0, color.selectedIndex)].value,
        size: size.options[Math.max(0, size.selectedIndex)].value,
        
    }
    console.log("create_shape.onsubmit:" + JSON.stringify(values));
}

let label_shape, shape, color, size;
let label_width = 200; 

let dialog = 
    h("dialog", 
        h("form", {method: "dialog", style: {width: 355 }, onsubmit }, 
            h("h1", "Create Your Shape"),
            h("label", {class: "row" },
            h("p", "Personalize the shape, color, and size of your object!"),
                h("label", {class: "row" },
                h("span", { style: { width: label_width } }, "Label your shape: "),
                label_shape = h("input", { uxpQuiet: true, style:{ flex: "1" } })
            ),
            h("label", { class: "row"},
                h("span", {style: {width: label_width } }, "Select a shape:"),
                shape = h("select", 
                    h("option", { value: "Circle"}, "Cicle"),
                    h("option", { value: "Triangle"}, "Triangle"),
                    h("option", { value: "Square"}, "Square"),
                    h("option", { value: "Oval"}, "Oval"),
                    h("option", { value: "Rectangle"}, "Rectangle")
                )
            ),
            h("label", { class: "row"},
                h("span", {style: {width: label_width } }, "Select a color:"),
                    color = h("select", 
                    h("option", { value: "Orange"}, "Orange"),
                    h("option", { value: "Blue"}, "Blue"),
                    h("option", { value: "Pink"}, "Pink"),
                    h("option", { value: "Purple"}, "Purple"),
                    h("option", { value: "Red"}, "Red"),
                    h("option", { value: "Yellow"}, "Yellow"),
                    h("option", { value: "Magenta"}, "Magenta"),
                    h("option", { value: "Light Blue"}, "Light Blue"),
                    h("option", { value: "Black"}, "Black"),
                    h("option", { value: "White"}, "White"),
                    h("option", { value: "Brown"}, "Brown"),
                    h("option", { value: "Grey"}, "Grey"),
                    h("option", { value: "Grey"}, "Grey"),
                    h("option", { value: "Maroon"}, "Maroon")
                )

            ),
            h("label", { class: "row"},
                h("span", {style: {width: label_width } }, "Select a size:"),
                    size = h("select", 
                    h("option", { value: "Small"}, "Small"),
                    h("option", { value: "Medium"}, "Medium"),
                    h("option", { value: "Large"}, "Large")
                    
                )
            ),
            h("footer", 
                    h("button", { uxpVariant: "primary", onclick(e) { dialog.close( )} }, "Cancel"),
                    h("button", { uxpVariant: "cta", onclick(e) { dialog.close( )} }, "Submit")
            )      
        )
    )
    )



document.body.appendChild(dialog);

module.exports =
 {
    commands: 
    {
        shapes: function () 
        {
            dialog.showModal();
        }
    }
};