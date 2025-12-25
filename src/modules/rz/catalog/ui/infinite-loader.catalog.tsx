import { Spinner } from "@/common/components/ui/spinner";

export function InfiniteLoader({
  isFetching,
  ...props
}: { isFetching: boolean } & React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className="w-full col-span-full flex items-center justify-center min-h-12"
    >
      {isFetching && <Spinner className="size-5" />}
    </div>
  );
}
