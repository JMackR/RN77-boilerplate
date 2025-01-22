import { Margin, SVG, Text, Touchable } from '@tallo/core-ui-library';

import { ChangeIcon, LocalSVGSource, ManageIcon, SearchIcon } from '@tallo/assets';

const icons = {
  search: SearchIcon,
  manage: ManageIcon,
  change: ChangeIcon,
};

export const PlanActionButton = ({ onPress, icon, text }) => {
  return (
    <Touchable onPress={onPress}>
      <Margin direction="row" marginLeftStep={4} marginRightStep={4}>
        <Margin axisDistribution="center" marginStep={1}>
          <SVG
            tint={'brand'}
            localSVG={{
              SVG: icons[icon].SVG,
              size: { width: 15, height: 15 },
            }}
          />
        </Margin>
        <Margin axisDistribution="center" marginStep={1}>
          <Text textType={'bodyMedium2'} color={'primary'} textAlign="left">
            {text}
          </Text>
        </Margin>
      </Margin>
    </Touchable>
  );
};
