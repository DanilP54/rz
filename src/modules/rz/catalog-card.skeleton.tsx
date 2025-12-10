import { Grid, Box, Card, Flex } from "@radix-ui/themes";// Импорт из файла выше

// --- SKELETON FALLBACK ---
export const CatalogSkeleton = () => {
  const skeletons = Array.from({ length: 8 });

  return (
    <Grid 
      columns={{ 
        initial: "1",
        xs: "2",
        sm: "3",
        md: "4",
        lg: "5",
        xl: "6"
      }} 
      gap="4" 
      width="auto" 
      className="mt-15" // Исправлено с mt-10 на mt-15, чтобы совпадало с CatalogItems
    >
      {skeletons.map((_, i) => (
        <Box key={i} width="100%" height="100%">
          <Card 
            size="1" // Добавлено, как в CatalogItem
            style={{ borderRadius: 0, padding: 0 }}
            className="border border-gray-200 h-full" // h-full для выравнивания высоты
          >
            <Flex direction="column" height="100%">
              
              {/* Имитация картинки: aspect-[4/3] совпадает с реальным */}
              <Box className="w-full aspect-[4/3] bg-gray-200 animate-pulse" />
              
              {/* Имитация текста и контента */}
              <Box p="3">
                <Flex justify="between" align="start" gap="2">
                  {/* Текстовый блок */}
                  <Box className="flex-1">
                    {/* Заголовок */}
                    <Box className="h-4 bg-gray-200 w-3/4 animate-pulse rounded-sm mb-2" />
                    {/* Подзаголовок */}
                    <Box className="h-3 bg-gray-100 w-1/2 animate-pulse rounded-sm" />
                  </Box>

                  {/* Имитация бейджика HD справа */}
                  <Box className="w-6 h-4 bg-gray-100 animate-pulse rounded-sm" />
                </Flex>
              </Box>

            </Flex>
          </Card>
        </Box>
      ))}
    </Grid>
  );
};