"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// APIレスポンスの型定義を修正
interface SearchResult {
  id: number;
  name: string;
}

// バリデーションルールを強化
const formSchema = z.object({
  searchQuery: z
    .string()
    .min(1, { message: "検索キーワードを入力してください" })
    .max(50, { message: "50文字以内で入力してください" })
    .regex(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー\s]+$/u, {
      message: "日本語で入力してください",
    }),
});

export function SearchForm() {
  // 検索結果の型を APIResponse に変更
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  // ローディング状態の管理
  const [isLoading, setIsLoading] = useState(false);
  // エラー状態の管理
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.searchQuery.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/item_test", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("APIリクエストに失敗しました");
      }

      const data = await response.json();
      setSearchResults(data.items);
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex max-w-lg items-start gap-4 p-4"
        >
          <div className="flex-1">
            <FormField
              control={form.control}
              name="searchQuery"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-4">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="地域名を入力（例：渋谷、新宿、池袋）"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      variant="default"
                      size="default"
                      className="min-w-[100px] px-8"
                      disabled={isLoading}
                    >
                      {isLoading ? "検索中..." : "検索"}
                    </Button>
                  </div>
                  <FormMessage className="mt-2 text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

      {/* 検索結果の表示 */}
      <div className="mx-auto max-w-5xl">
        {error && (
          <div className="rounded-md bg-red-50 p-4 text-red-700">{error}</div>
        )}

        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">検索結果</h2>
          {searchResults.length > 0 && (
            <div className="space-y-4">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  className="rounded-md border bg-background p-4"
                >
                  <h3 className="font-medium">{item.name}</h3>
                  {/* 他の項目も表示 */}
                </div>
              ))}
            </div>
          )}
          {!isLoading && searchResults.length === 0 && (
            <p className="text-center text-muted-foreground">
              検索結果がありません
            </p>
          )}
        </div>
      </div>
    </div>
  );
}