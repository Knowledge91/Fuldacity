
def imageAspectRatio(height, width):
    ratios = {'1:1':height/width, '2:1':height/2*width, '1:2':2*height/width}
    print(min(ratios, key=ratios.get))

