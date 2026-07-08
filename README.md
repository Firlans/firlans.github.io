# Firlan Syah's Portfolio

Welcome to my portfolio repository! I'm **Firlan Syah**, a Back-end Developer with a background in Computer Science.

> I'm passionate about creating innovative solutions and exploring cutting-edge technologies.

## About This Project

This portfolio is built using Vue 3 and Vite.

## Component Documentation

Portfolio app components are grouped into `base`, `features`, and `layouts`.

### Base Components

#### BaseButton

Primary action button with fixed Tailwind styling.

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `String` | required | Button label |
| `icon` | `String` | `undefined` | Optional icon class rendered before text |
| `onClick` | `Function` | `undefined` | Click handler passed from parent |
| `disabled` | `Boolean` | `false` | Disabled state |

Notes:

- The template references `iconRight`, but that prop does not exist in the component API.
- Click handling is delegated via prop instead of emitting a Vue event.

#### BaseInput

Basic labeled input with `v-model` support.

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `String` | `'text'` | Native input type |
| `placeholder` | `String` | `''` | Placeholder text |
| `label` | `String` | `''` | Input label |
| `modelValue` | `String \| Number` | `''` | Bound value |
| `id` | `String` | generated | Input id used by the label |
| `disabled` | `Boolean` | `false` | Disabled state |
| `required` | `Boolean` | `false` | Required flag and asterisk marker |

Event:

- `update:modelValue`

#### BaseTag

Small pill-style wrapper component. It has no props and only renders the default slot inside a styled `span`.

#### MaintenanceLayer

Overlay card for unavailable content.

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `String` | `'This section is temporarily unavailable.'` | Heading text |
| `description` | `String` | `'Please try again later or refresh the page.'` | Supporting text |

### Feature Components

#### CardFeature

Reusable content card for experience, education, or project entries.

| Prop | Type | Default | Description |
|---|---|---|---|
| `layout` | `String` | `'horizontal'` | `horizontal` or `vertical` layout |
| `imgSrc` | `String` | required | Image or logo URL |
| `title` | `String` | required | Main title |
| `shortDescription` | `String` | required | Subtitle or role |
| `description` | `String` | required | Main descriptive paragraph |
| `details` | `Array` | `[]` | Bullet list of supporting details |
| `duration` | `String` | required | Date range or duration |
| `labels` | `Array` | `[]` | Declared but currently unused in template |
| `tags` | `Array` | `[]` | Rendered with `BaseTag` |
| `links` | `Array` | `[]` | CTA links in format `{ text, url }` |

Behavior:

- `vertical` mode forces a stacked card layout.
- Tag content is rendered with `v-html`, so tag strings may contain HTML.

#### MaintenanceFeature

Full maintenance-mode section for the portfolio landing page. This component does not expose props; all content is currently static inside the template.

#### SliderFeature

The file exists but is currently empty, so there is no public API yet.

#### TableFeature

The file exists but is currently empty, so there is no public API yet.

### Layout Components

#### FooterLayout

Static footer section containing quick links, social links, and a back-to-top link. It currently has no props or emitted events; navigation items are defined internally in the component.

#### HeaderLayout

Sticky header with desktop and mobile navigation.

Internal behavior:

- Maintains `isMenuOpen` locally with `ref(false)`.
- Uses a hard-coded `navLinks` array for section anchors and icon classes.
- Mobile menu closes itself when a navigation link is clicked.
