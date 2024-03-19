import { SearchContext } from "@/store";
import classNames from "classnames";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export type DictProps = {
  children: ReactNode  
}


export const Dict = () => {
  const { search } = useContext(SearchContext)!;

  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder={search} />
      </div>

      <Card className="w-full">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              {/* <Label htmlFor="name">Name</Label> */}
              <Input id="name" placeholder="Name of your project" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
    </>
  )
};
