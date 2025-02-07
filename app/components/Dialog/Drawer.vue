<script lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

const drawer = tv({
  base: "absolute z-[1002] overflow-hidden bg-white text-black shadow-2xl shadow-brand-700/70",
  variants: {
    size: {
      default: "",
      md: "",
      lg: "",
    },
    position: {
      left: "bottom-0 left-0 top-0 h-dvh",
      right: "bottom-0 right-0 top-0 h-dvh",
      bottom: "bottom-0 left-0 right-0 max-h-[50vh]",
    },
  },
  compoundVariants: [
    {
      size: "default",
      position: ["left", "right"],
      class: "w-full max-w-80",
    },
    {
      size: "md",
      position: ["left", "right"],
      class: "w-full max-w-md",
    },
    {
      size: "lg",
      position: ["left", "right"],
      class: "w-full max-w-2xl",
    },
  ],
});

type DrawerVariants = VariantProps<typeof drawer>;

interface Props {
  position?: DrawerVariants["position"];
  size?: DrawerVariants["size"];
  title: string;
  dismissible?: boolean;
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  position: "left",
  size: "default",
  dismissible: true,
});

const escKeyEvent = import.meta.client
  ? new KeyboardEvent("keydown", {
      key: "Escape",
      code: "Escape",
      bubbles: true,
    })
  : null;

const route = useRoute();
const dialogContentEl = ref<HTMLElement | null>(null);

const ui = computed(() =>
  drawer({
    position: props.position,
    size: props.size,
  })
);

function handleDialogClose() {
  if (props.dismissible && escKeyEvent) {
    dialogContentEl.value?.dispatchEvent(escKeyEvent);
  }
}

onClickOutside(dialogContentEl, () => {
  handleDialogClose();
});

watch(route, () => {
  handleDialogClose();
});
</script>
<template>
  <DialogRoot>
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <Transition name="fade">
        <DialogOverlay class="fixed inset-0 z-[1000] bg-brand-800/70" />
      </Transition>
      <Transition :name="`slide-in-${props.position}`">
        <DialogContent
          class="scroll-touch fixed inset-0 z-[1001] overflow-hidden"
        >
          <div ref="dialogContentEl" :class="ui">
            <DialogTitle as-child>
              <VisuallyHidden>
                {{ props.title }}
              </VisuallyHidden>
            </DialogTitle>
            <div class="h-dvh overflow-y-auto px-8 py-16">
              <slot />
            </div>
            <DialogClose as-child>
              <AppButtonClose />
            </DialogClose>
          </div>
        </DialogContent>
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>
