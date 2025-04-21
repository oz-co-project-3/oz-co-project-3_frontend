'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FieldPath, FieldValues, UseFormReturn, FieldPathValue } from 'react-hook-form';

interface CheckboxGroupProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  options: string[];
}

export function CheckboxGroup<T extends FieldValues>({ form, name, options }: CheckboxGroupProps<T>) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((item) => (
        <Label key={item} className="cursor-pointer">
          <div className="flex items-center gap-2">
            <Checkbox
              id={`${String(name)}-${item}`}
              checked={form.watch(name)?.includes(item)}
              onCheckedChange={(checked) => {
                const rawValue = form.getValues(name) as string[] | undefined;
                const values = Array.isArray(rawValue) ? rawValue : [];

                form.setValue(
                  name,
                  (checked
                    ? [...values, item]
                    : values.filter((i) => i !== item)) as FieldPathValue<T, typeof name>
                );
              }}
              className="data-[state=checked]:border-[#2F4858] data-[state=checked]:bg-[#2F4858]"
            />
            {item}
          </div>
        </Label>
      ))}
    </div>
  );
}
