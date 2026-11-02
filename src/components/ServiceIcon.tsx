import type { ServiceIconName } from "@/lib/services";
import {
  BrakeIcon,
  DropletIcon,
  EngineIcon,
  SnowflakeIcon,
  SuspensionIcon,
  TruckIcon,
  ZapIcon,
} from "./icons";

const MAP = {
  brakes: BrakeIcon,
  suspension: SuspensionIcon,
  ac: SnowflakeIcon,
  engine: EngineIcon,
  electrical: ZapIcon,
  maintenance: DropletIcon,
  mobile: TruckIcon,
} as const;

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconName;
  className?: string;
}) {
  const Icon = MAP[name];
  return <Icon className={className} />;
}
