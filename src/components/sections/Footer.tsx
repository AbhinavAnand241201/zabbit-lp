export function Footer() {
  return (
    <footer className="border-t border-white/10 py-6">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Zabbit. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
