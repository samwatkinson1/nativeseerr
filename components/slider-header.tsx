import { Host, HStack, Image } from "@expo/ui/swift-ui";
import { frame } from "@expo/ui/swift-ui/modifiers";
import { Href, Link } from "expo-router";

import { SliderTitle, SliderTitleProps } from "@/components/slider-title";

export interface SliderHeaderProps extends SliderTitleProps {
  href?: Href;
}

export function SliderHeader({ href, title }: SliderHeaderProps) {
  if (!href) {
    return (
      <Host style={{ marginHorizontal: 16 }}>
        <SliderTitle title={title} />
      </Host>
    );
  }

  // fixme: this doesn't work
  return (
    <Link href={href} asChild>
      <Host style={{ marginHorizontal: 16 }}>
        <HStack alignment="center">
          <SliderTitle title={title} />
          <Image
            systemName="chevron.right"
            size={20}
            modifiers={[frame({ height: 24, width: 24 })]}
          />
        </HStack>
      </Host>
    </Link>
  );
}
