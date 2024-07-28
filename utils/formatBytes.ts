interface ConvertBytesProps {
  bytes: number;
  decimals?: number;
}

const base = 1000;
const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

export function formatBytes({
  bytes,
  decimals = 1,
}: ConvertBytesProps): string {
  if (decimals < 0) {
    throw new Error(`Invalid decimals ${decimals}`);
  }

  const i = Math.floor(Math.log(bytes) / Math.log(base));

  return `${(bytes / Math.pow(base, i)).toFixed(decimals)} ${units[i]}`;
}
