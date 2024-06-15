# Generic Dropdown

Generic. What more do you need to know?

## How to use

Arguments :

#### 1. Create button and container element

Add any classes to them, this will be used to call the module.
Container element should have additional class `hidden`.
They do not need to be siblings element, having correct class name is enough.

Example :

```html
<button class="dropdown-btn">ClickMe</button>
<div class="dropdown-container hidden">
  <p>Item 1</p>
  <p>Item 2</p>
  <p>Item 3</p>
  <p>Item 4</p>
</div>
```

#### 2. Add ruleset to your style

Add `.hidden` selector to your css

Example :

```css
.hidden {
  display: none;
}
```

#### 3. Call the module

Call the module with classes you set before

Example:

```js
import genericDropdown from 'generic-dropdown';

genericDropdown('dropdown-btn', 'dropdown-container');
```
