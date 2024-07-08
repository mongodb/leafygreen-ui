# Message Rating

## Installation

### Yarn

```shell
yarn add @lg-chat/message-rating
```

### NPM

```shell
npm install @lg-chat/message-rating
```

## Example

```ts
export const Controlled = ({ value: valueProp, ...rest }) => {
  const [value, setValue] = useState<MessageRatingProps['value']>(valueProp);

  useEffect(() => {
    setValue(value);
  }, [valueProp]);

  const handleRatingChange: ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value as MessageRatingProps['value']);
  };

  return (
    <MessageRating {...rest} value={value} onChange={handleRatingChange} />
  );
};
```

**Output HTML**

```html
<div class="leafygreen-ui-oxspne">
  <p class="leafygreen-ui-110o31d">How was the response?</p>
  <div class="leafygreen-ui-44gx6g">
    <div class="leafygreen-ui-1njkmr8">
      <input
        id="like-message-rating-4"
        type="radio"
        name="message-rating-4"
        aria-checked="false"
        hidden=""
        aria-label="Thumbs up this message"
        value="liked"
      /><label for="like-message-rating-4" class="leafygreen-ui-chzegx"
        ><svg
          class="leafygreen-ui-1rhtncv"
          height="16"
          width="16"
          role="img"
          aria-label="Thumbs Up Icon"
          viewBox="0 0 16 16"
        >
          <path /></svg
      ></label>
    </div>
    <div class="leafygreen-ui-1njkmr8">
      <input
        id="dislike-message-rating-4"
        type="radio"
        name="message-rating-4"
        aria-checked="false"
        hidden=""
        aria-label="Thumbs down this message"
        value="disliked"
      /><label for="dislike-message-rating-4" class="leafygreen-ui-chzegx"
        ><svg
          class="leafygreen-ui-1rhtncv"
          height="16"
          width="16"
          role="img"
          aria-label="Thumbs Down Icon"
          viewBox="0 0 16 16"
        >
          <path /></svg
      ></label>
    </div>
  </div>
</div>
```

## Properties

| Prop          | Type                                         | Description                                                                    | Default                   |
| ------------- | -------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------- |
| `darkMode`    | `boolean`                                    | Determines if the component is rendered in dark mode                           | `false`                   |
| `description` | `string`                                     | Custom description text                                                        | `'How was the response?'` |
| `onChange`    | `React.ChangeEventHandler<HTMLInputElement>` | Event handler called when the value of the underlying radio inputs are changed |                           |
| `value`       | `'liked', 'disliked'`                        | Determines the currently selected value of the radio buttons                   |                           |
| `...`         | `HTMLElementProps<'div'>`                    | Props spread on root element                                                   |                           |
